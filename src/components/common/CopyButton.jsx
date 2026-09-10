import { useState, useCallback } from 'react';
import { Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function CopyButton({
  value,
  onCopy,
  copiedText = 'Copied!',
  variant = 'ghost',
  size = 'icon',
  className,
  tooltip,
  ...props
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      if (onCopy) {
        await onCopy(value);
      } else if (value) {
        await navigator.clipboard.writeText(value);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, [value, onCopy]);

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleCopy}
      className={cn('shrink-0', className)}
      aria-label={copied ? copiedText : `Copy ${tooltip || 'to clipboard'}`}
      title={copied ? copiedText : tooltip}
      {...props}
    >
      {copied ? (
        <Check className="size-4 text-emerald-500" />
      ) : (
        <Copy className="size-4" />
      )}
    </Button>
  );
}

export default CopyButton;
