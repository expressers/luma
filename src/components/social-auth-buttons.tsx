import { Button } from "@/components/ui/button";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.46a5.52 5.52 0 0 1-2.4 3.62v3h3.88c2.27-2.09 3.58-5.17 3.58-8.81Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.08 7.94-2.92l-3.88-3a7.2 7.2 0 0 1-10.72-3.78H1.34v3.09A12 12 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.34 14.3a7.2 7.2 0 0 1 0-4.6V6.61H1.34a12 12 0 0 0 0 10.78l4-3.09Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.77c1.76 0 3.35.61 4.6 1.8l3.44-3.44C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.34 6.61l4 3.09A7.2 7.2 0 0 1 12 4.77Z"
      />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
      <path d="M17.05 12.54c-.03-2.7 2.2-4 2.3-4.06-1.25-1.83-3.2-2.08-3.9-2.11-1.66-.17-3.24.98-4.08.98-.84 0-2.14-.96-3.52-.93-1.81.03-3.48 1.05-4.41 2.67-1.88 3.26-.48 8.08 1.35 10.72.9 1.29 1.97 2.74 3.38 2.69 1.36-.06 1.87-.88 3.51-.88 1.64 0 2.1.88 3.53.85 1.46-.02 2.38-1.31 3.27-2.61 1.03-1.5 1.46-2.95 1.48-3.02-.03-.02-2.85-1.09-2.88-4.3M14.4 4.4c.74-.9 1.24-2.15 1.1-3.4-1.07.05-2.36.72-3.13 1.61-.68.79-1.29 2.06-1.13 3.28 1.2.09 2.42-.61 3.16-1.49" />
    </svg>
  );
}

export function SocialAuthButtons() {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      <Button variant="outline" type="button">
        <GoogleIcon />
        Google
      </Button>
      <Button variant="outline" type="button">
        <AppleIcon />
        Apple
      </Button>
    </div>
  );
}

export function AuthDivider({ label = "ou continua com e-mail" }) {
  return (
    <div className="relative text-center text-xs">
      <span className="border-border absolute inset-0 top-1/2 border-t" />
      <span className="bg-background text-muted-foreground relative px-3">
        {label}
      </span>
    </div>
  );
}
