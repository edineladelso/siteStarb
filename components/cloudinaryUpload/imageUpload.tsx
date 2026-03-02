// components/ui/image-upload.tsx
"use client";

import { CldUploadWidget, CldImage } from "next-cloudinary";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ImageIcon, Loader2, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string, publicId: string) => void;
  onRemove?: () => void;
  folder?: string;
  className?: string;
  disabled?: boolean;
}

export function ImageUpload({
  value,
  onChange,
  onRemove,
  folder = "meu-projeto",
  className,
  disabled,
}: ImageUploadProps) {
  const [isLoading, setIsLoading] = useState(false);
  const isRemoteUrl = Boolean(value && /^https?:\/\//.test(value));

  return (
    <div className={cn("space-y-4", className)}>
      {value && (
        <div className="relative w-fit">
          {isRemoteUrl ? (
            <Image
              src={value}
              alt="Imagem enviada"
              width={200}
              height={200}
              className="rounded-xl object-cover shadow-md"
            />
          ) : (
            <CldImage
              src={value}
              alt="Imagem enviada"
              width={200}
              height={200}
              className="rounded-xl object-cover shadow-md"
              crop="fill"
              gravity="auto"
            />
          )}
          {onRemove && (
            <button
              type="button"
              onClick={onRemove}
              aria-label="Remover imagem"
              className="absolute -top-2 -right-2 rounded-full bg-destructive p-1 shadow-md 
                         text-white hover:bg-destructive/90 transition-colors"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>
      )}

      <CldUploadWidget
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!}
        options={{
          folder,
          maxFiles: 1,
          resourceType: "image",
          clientAllowedFormats: ["jpg", "jpeg", "png", "webp"],
          maxFileSize: 5_000_000, // 5MB
          cropping: false,
          showAdvancedOptions: false,
          sources: ["local", "camera"],
          language: "pt",
          text: { "en": { "or": "ou" } },
        }}
        onSuccess={(result) => {
          const info = result.info as { secure_url: string; public_id: string };
          onChange(info.secure_url, info.public_id);
          setIsLoading(false);
        }}
        onQueuesStart={() => setIsLoading(true)}
        onError={() => setIsLoading(false)}
      >
        {({ open }) => (
          <Button
            type="button"
            variant="outline"
            onClick={() => open()}
            disabled={disabled || isLoading}
            className="shadow-sm"
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <ImageIcon className="mr-2 h-4 w-4" />
            )}
            {value ? "Trocar imagem" : "Enviar imagem"}
          </Button>
        )}
      </CldUploadWidget>
    </div>
  );
}
