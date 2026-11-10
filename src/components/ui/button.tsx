import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

// Restylé sur les tokens Dancehop (design.md) : bouton principal qui s'allume (D46),
// bouton sans fond, lien. Hauteur 600, cible tactile 550 au minimum.
const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-100 whitespace-nowrap select-none transition-colors disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "lit rounded-lg type-body-strong disabled:bg-bg-accent-disabled disabled:bg-none disabled:shadow-none disabled:text-text-accent-inverted-disabled",
        ghost:
          "rounded-full text-icon-neutral-default active:bg-bg-neutral-strong-pressed disabled:text-icon-neutral-disabled",
        link: "type-body-strong text-text-accent-default hover:text-text-accent-hover",
      },
      size: {
        default: "h-600 w-full px-300",
        icon: "size-550",
        inline: "min-h-550 px-200",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
