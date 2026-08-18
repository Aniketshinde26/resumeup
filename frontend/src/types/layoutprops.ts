import type { ChangeEvent, ReactNode } from "react";
import React from "react";

export interface AuthContainerProps {
  children: ReactNode;
}

export interface GridBackgroundProps {
  children: React.ReactNode;
  dotColor?: string;
  dotSize?: string;
  gapSize?: string;
}

export interface SkeletonWrapperProps {
  isLoading: boolean;
  count?: number;
  skeleton?: React.ReactNode;
  children: React.ReactNode;
}

export interface PasswordInputProps {
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  inputClassName?: string;
}

export interface DocumentCardProps {
  title: string;
  updatedAt?: string;
  id: string | number;
  type: "resume" | "coverletter";
  preview?: string;
  showContent?: boolean;
  onClick?: () => void;
  onDelete?: () => void;
}

export interface CreateItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (title: string) => void;
  isLoading: boolean;
  type: "Resume" | "Cover Letter";
}

export interface BuilderHeaderProps {
  productName: string;
  productSuffix?: string;
  accentColor: string;
  buttonColor: string;
  docTitle: string;
  isSaving: boolean;
  isDirty: boolean;
  onSave: () => void;
  onDownload: () => void;
}

export interface ActionPanelProps {
  className?: string;
}

export interface ErrorProps {
  message: string;
}
export interface AuthFooterProps {
  label: string;
  linkText: string;
  href: string;
}
