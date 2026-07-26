import { InputHTMLAttributes, forwardRef, ReactNode, useId, useState } from "react";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  helperText?: string;
  error?: string;
  success?: boolean;
  successMessage?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  type?: "text" | "email" | "password" | "number" | "tel" | "url";
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    helperText,
    error,
    success = false,
    successMessage,
    leftIcon,
    rightIcon,
    fullWidth = false,
    required = false,
    disabled = false,
    id,
    type = "text",
    placeholder,
    className,
    ...props
  },
  ref
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const helperId = `${inputId}-helper`;
  const errorId = `${inputId}-error`;
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;
  const hasError = Boolean(error);
  const hasSuccess = success && !hasError;

  return (
    <div className={["input-group", fullWidth ? "input-full" : ""].filter(Boolean).join(" ")}> 
      {label ? (
        <label className="input-label" htmlFor={inputId}>
          {label}
          {required ? " *" : null}
        </label>
      ) : null}

      <div
        className={[
          "input-wrapper",
          hasError ? "input-control-error" : "",
          hasSuccess ? "input-control-success" : "",
          disabled ? "input-disabled" : ""
        ].filter(Boolean).join(" ")}
      >
        {leftIcon ? <span className="input-icon-left" aria-hidden="true">{leftIcon}</span> : null}

        <input
          ref={ref}
          id={inputId}
          type={inputType}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          aria-invalid={hasError || undefined}
          aria-describedby={hasError ? errorId : helperText ? helperId : undefined}
          className={["input-control", className || ""].filter(Boolean).join(" ")}
          {...props}
        />

        {isPassword ? (
          <button
            type="button"
            className="input-icon-right"
            onClick={() => setShowPassword((value) => !value)}
            aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            disabled={disabled}
          >
            {showPassword ? (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3 3l18 18" />
                <path d="M10.6 10.6A3 3 0 0 0 13.4 13.4" />
                <path d="M9 5.3A10.7 10.7 0 0 1 12 5c4.2 0 7.7 2.5 9 6a13.8 13.8 0 0 1-2.8 4.2" />
                <path d="M6.2 6.2A13.8 13.8 0 0 0 3 11c1.3 3.5 4.8 6 9 6 1.1 0 2.1-.2 3-.5" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        ) : rightIcon ? (
          <span className="input-icon-right" aria-hidden="true">
            {rightIcon}
          </span>
        ) : null}
      </div>

      {helperText && !hasError ? (
        <p id={helperId} className="input-helper">
          {helperText}
        </p>
      ) : null}

      {hasError ? (
        <p id={errorId} className="input-error">
          {error}
        </p>
      ) : null}

      {hasSuccess && !hasError && successMessage ? <p className="input-success">{successMessage}</p> : null}
    </div>
  );
});

export default Input;
