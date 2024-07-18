import React, { TextareaHTMLAttributes } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  placeholder: string;
  type: string;
  label?: string;
  errorMessage?: string;
  name: string;
  value?: string;
  onBlur: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea = ({ label, errorMessage, ...rest }: TextAreaProps) => {
  return (
    <div className="form">
      {label && <p className="label body-M">{label}</p>}
      <textarea {...rest} />
      {errorMessage && typeof errorMessage === "string" && (
        <p className="message body-L">{errorMessage}</p>
      )}
    </div>
  );
};

export default TextArea;
