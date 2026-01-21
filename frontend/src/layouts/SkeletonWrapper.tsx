import React from "react";

// The "Universal Bone" design
const DefaultCardSkeleton = () => (
  <div className="flex flex-col w-full h-full">
    {/* Main Document Body */}
    <div className="aspect-[1/1.41] w-full bg-white rounded-xl border border-slate-200 p-5 shadow-sm overflow-hidden flex flex-col gap-4">
      {/* Abstract Title Bone */}
      <div className="h-4 w-2/3 skeleton-card rounded-md opacity-80" />
      
      {/* Divider */}
      <div className="h-[1px] w-full bg-slate-100 my-1" />

      {/* Paragraph Bones */}
      <div className="space-y-3">
        <div className="h-2 w-full skeleton-card rounded opacity-50" />
        <div className="h-2 w-full skeleton-card rounded opacity-50" />
        <div className="h-2 w-4/5 skeleton-card rounded opacity-50" />
      </div>

      <div className="mt-auto space-y-3">
        <div className="h-2 w-full skeleton-card rounded opacity-40" />
        <div className="h-8 w-full skeleton-card rounded-md opacity-20" />
      </div>
    </div>

    {/* Label Placeholder */}
    <div className="mt-3 h-4 w-1/2 bg-slate-400/20 rounded self-center animate-pulse" />
  </div>
);

interface SkeletonWrapperProps {
  isLoading: boolean;
  count?: number;
  skeleton?: React.ReactNode; // Made optional with '?'
  children: React.ReactNode;
}

export default function SkeletonWrapper({
  isLoading,
  count = 1,
  skeleton = <DefaultCardSkeleton />, // Set the default design here
  children,
}: SkeletonWrapperProps) {
  if (!isLoading) return <>{children}</>;

  return (
    <>
      {Array(count)
        .fill(0)
        .map((_, i) => (
          <div key={i}>{skeleton}</div>
        ))}
    </>
  );
}