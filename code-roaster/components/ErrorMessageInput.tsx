interface ErrorMessageInputProps {
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
}

// Optional drawer where the user can paste the error their code produced.
export function ErrorMessageInput({ value, onChange, onClose }: ErrorMessageInputProps) {
  return (
    <div className="border-b-2 border-frame bg-[#EFEFEA] px-5 py-2.5 text-xs font-mono shrink-0">
      <div className="flex items-center justify-between mb-1.5">
        <label htmlFor="error-message" className="text-[10px] font-bold uppercase tracking-widest text-[#555]">
          Attach Terminal Traceback / Compiler Error (Optional)
        </label>
        <button type="button" onClick={onClose} className="text-xs hover:underline text-[#666]">
          Dismiss ✕
        </button>
      </div>
      <textarea
        id="error-message"
        className="w-full text-xs font-mono border border-frame p-2 bg-white focus:outline-none focus:ring-0 focus:border-frame resize-none"
        placeholder="TypeError: unsupported operand type(s) for +=: 'int' and 'list'..."
        rows={2}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
