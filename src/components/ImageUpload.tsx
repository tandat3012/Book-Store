'use client';
import config from '@/lib/config';
import {
    Image,
    ImageKitProvider,
    upload,
    ImageKitAbortError,
    ImageKitInvalidRequestError,
    ImageKitServerError,
    ImageKitUploadNetworkError,
} from '@imagekit/next';
import { useRef, useState } from 'react';
import NextImage from 'next/image';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const {
    env: {
        imagekit: { publicKey, urlEndpoint },
    },
} = config;

const authenticator = async () => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/imageKit`,
        );
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        const { signature, expire, token } = data;
        return { signature, expire, token };
    } catch (err) {
        throw new Error('Authentication failed');
    }
};

interface Props {
    type: 'image' | 'video';
    accept: string;
    variant: 'dark' | 'light';
    folder: string;
    value?: string;
    placeholder: string;
    onUploadSuccess?: (url: string) => void;
    onUploadError?: (error: string) => void;
}

const ImageUpload = ({
    type,
    accept,
    variant,
    folder,
    value,
    placeholder,
    onUploadSuccess,
    onUploadError,
}: Props) => {
    const { toast } = useToast();

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File | null>(null);
    const [progress, setProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadResponse, setUploadResponse] = useState<any>(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState<
        string | undefined
    >(undefined);

    const styles = {
        button:
            variant === 'dark'
                ? 'bg-dark-300'
                : 'bg-light-600 border-gray-100 border',
        placeholder: variant === 'dark' ? 'text-light-100' : 'text-slate-500',
        text: variant === 'dark' ? 'text-light-100' : 'text-dark-400',
    };

    const onSuccess = (fileName: string, response: any) => {
        toast({
            title: '✅ Upload successful',
            description: `File ${fileName} uploaded successfully`,
            variant: 'default',
        });

        setProgress(100);

        if (onUploadSuccess) {
            onUploadSuccess(response.url);
        }
    };

    const onError = (error: any, fileName?: string) => {
        let errorMessage = 'Upload failed';

        if (error instanceof ImageKitAbortError) {
            errorMessage = `Upload aborted`;
        } else if (error instanceof ImageKitInvalidRequestError) {
            errorMessage = `Invalid request: ${error.message}`;
        } else if (error instanceof ImageKitUploadNetworkError) {
            errorMessage = `Network error: ${error.message}`;
        } else if (error instanceof ImageKitServerError) {
            errorMessage = `Server error: ${error.message}`;
        } else if (error.message) {
            errorMessage = error.message;
        }

        toast({
            title: '❌ Upload failed',
            description: errorMessage,
            variant: 'destructive',
        });

        // Reset states
        setProgress(0);
        setUploadedImageUrl(undefined);
        setUploadResponse(null);
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            setProgress(0);
            setUploadedImageUrl(undefined);
            setUploadResponse(null);

            // Auto upload
            handleUpload(selectedFile);
        }
    };

    const handleUpload = async (fileToUpload?: File) => {
        const targetFile = fileToUpload || file;

        if (!targetFile) {
            onError(new Error('No file selected to upload'));
            return;
        }

        setIsUploading(true);

        try {
            const authParams = await authenticator();
            const { signature, expire, token } = authParams;

            // Upload
            const uploadResult = await upload({
                expire,
                token,
                signature,
                publicKey,
                file: targetFile,
                fileName: `${folder}/${Date.now()}_${targetFile.name}`,
                folder: folder,
                onProgress: (event) => {
                    const progressPercent = Math.round(
                        (event.loaded / event.total) * 100,
                    );
                    setProgress(progressPercent);
                },
            });

            console.log('Upload result:', uploadResult);

            // Save result
            setUploadResponse(uploadResult);
            setUploadedImageUrl(uploadResult.url);

            onSuccess(targetFile.name, uploadResult);
        } catch (error) {
            console.error('Upload error:', error);
            onError(error, targetFile.name);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <ImageKitProvider urlEndpoint={urlEndpoint}>
            <div className="space-y-4">
                <input
                    type="file"
                    accept={accept}
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileSelect}
                    disabled={isUploading}
                />

                <button
                    className={cn('upload-btn', styles.button, {
                        'opacity-50 cursor-not-allowed': isUploading,
                    })}
                    onClick={(e) => {
                        e.preventDefault();
                        if (!isUploading && fileInputRef.current) {
                            fileInputRef.current.click();
                        }
                    }}
                    disabled={isUploading}
                >
                    <NextImage
                        src="/icons/upload.svg"
                        alt="upload-icon"
                        width={20}
                        height={20}
                        className="object-contain"
                    />

                    <p className={cn('text-base', styles.placeholder)}>
                        {isUploading ? 'Uploading...' : placeholder}
                    </p>
                </button>

                {/* File info */}
                {file && (
                    <div className={cn('text-sm', styles.text)}>
                        <p>📄 File: {file.name}</p>
                        <p>📊 Size: {(file.size / 1024).toFixed(2)} KB</p>
                    </div>
                )}

                {/* Progress bar */}
                {isUploading && progress > 0 && (
                    <div className="w-full">
                        <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                                className="h-3 bg-green-600 rounded-full transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <p
                            className={cn(
                                'text-xs mt-1 text-center',
                                styles.text,
                            )}
                        >
                            Uploading: {progress}%
                        </p>
                    </div>
                )}

                {/* Image preview */}
                {uploadedImageUrl && uploadResponse && (
                    <div className="flex justify-center mb-3">
                        <Image
                            width={200}
                            height={200}
                            src={uploadResponse.filePath}
                            transformation={[
                                {
                                    width: 200,
                                    height: 200,
                                    cropMode: 'pad_resize',
                                    quality: 80,
                                },
                            ]}
                            alt="Uploaded preview"
                            className="rounded-lg shadow-md"
                        />
                    </div>
                )}
            </div>
        </ImageKitProvider>
    );
};

export default ImageUpload;
