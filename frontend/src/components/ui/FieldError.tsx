export default function FieldError({ message }: { message: string }) {
  return (
    <p className="text-xs font-semibold text-red-500 mt-1 ml-1">{message}</p>
  );
}