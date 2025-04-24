import * as React from "react";

import { cn, VariantProps } from "@usekeyhole/utils";
import {
  Command,
  CommandEmpty,
  CommandEmptyProps,
  CommandInput,
  CommandInputProps,
  CommandItem,
  CommandItemProps,
  CommandList,
  CommandListProps,
  CommandLoading,
  CommandLoadingProps,
  CommandProps,
  CommandGroup as SearchGroup,
  CommandGroupProps as SearchGroupProps,
  CommandSeparator as SearchSeparator,
  CommandShortcut as SearchShortcut,
} from "./command";
import { Skeleton } from "@usekeyhole/ui";
import {
  ISearchValue,
  searchInputVariants,
  SearchProvider,
  useSearchContext,
} from "./context";
import { Button, ButtonIcon, X } from "@usekeyhole/nativewind";
import { cva } from "class-variance-authority";
import { useOnClickOutside } from "usehooks-ts";

type SearchProps = CommandProps & ISearchValue;

const Search = React.forwardRef<React.ElementRef<typeof Command>, SearchProps>(
  (
    { className, open, loading, onClose, onOpen, ...props }: SearchProps,
    ref
  ) => {
    return (
      <SearchProvider value={{ open, loading, onClose, onOpen }}>
        <SearchInner ref={ref} className={className} {...props} />
      </SearchProvider>
    );
  }
);

Search.displayName = "Search";

export type SearchInnerProps = CommandProps;

// the code belllow is experimental
/* const searchInnerVariants = cva(
  "bg-background relative cursor-default flex-row items-center rounded-sm border outline-none transition-colors",
  {
    variants: {
      variant: {
        default: "border-input",
        clear: "border-transparent bg-transparent",
        destructive: "border-destructive",
      },
      size: {
        sm: "h-auto",
        md: "h-9",
        lg: "h-11",
      },
      focused: {
        false: undefined,
        true: undefined,
      },
      hovered: {
        false: undefined,
        true: undefined,
      },
    },
    compoundVariants: [
      // default
      {
        focused: false,
        hovered: true,
        variant: "default",
        className: "border-input/dark-70",
      },
      // default
      {
        focused: true,
        variant: "default",
        className: "border-primary",
      },
      // default
      {
        focused: true,
        hovered: true,
        variant: "default",
        className: "border-primary",
      },
    ],
    defaultVariants: {
      size: "lg",
      variant: "default",
      focused: false,
    },
  }
); */

// The code abouve is experimental

const SearchInner = React.forwardRef<
  React.ElementRef<typeof Command>,
  SearchInnerProps
>(
  (
    {
      className,
      onValueChange,
      shouldFilter = false,
      ...props
    }: SearchInnerProps,
    ref
  ) => {
    const { open, selected, setSelected, setOpen, variant } =
      useSearchContext();
    const innerRef = React.useRef<HTMLDivElement>(null);

    const handleOnSelect = (value: string) => {
      setSelected(value);
      onValueChange?.(value);
    };

    const handleClickOutside = React.useCallback(() => {
      setOpen(false);
    }, [setOpen]);

    useOnClickOutside(innerRef, handleClickOutside);

    React.useImperativeHandle(ref, () => innerRef.current as HTMLDivElement);

    return (
      <div
        className={cn(
          "relative flex flex-1 flex-col rounded-t-lg border",
          searchInputVariants({ open, variant }),
          {
            "rounded-b-lg": !open,
          },
          className
        )}
      >
        <Command
          ref={innerRef}
          value={selected}
          onValueChange={handleOnSelect}
          loop
          shouldFilter={shouldFilter}
          {...props}
        />
      </div>
    );
  }
);

SearchInner.displayName = Command.displayName;

type SearchInputProps = CommandInputProps &
  VariantProps<typeof searchInputVariants>;

const SearchInput = React.forwardRef<
  React.ElementRef<typeof CommandInput>,
  SearchInputProps
>(
  (
    {
      className,
      value,
      onValueChange,
      wrapperClassName,
      onFocus,
      onBlur,
      variant,
      ...props
    }: SearchInputProps,
    ref
  ) => {
    const { open, searchStr, setSearchStr, setOpen, setVariant } =
      useSearchContext();
    const inputRef = React.useRef<HTMLInputElement>(null);

    const hasSearchString = searchStr.length > 0;

    const handleOnValueChange = React.useCallback(
      (value: string) => {
        setSearchStr(value);
        onValueChange?.(value);
      },
      [onValueChange, setSearchStr]
    );

    const handleOnFocus = React.useCallback<
      React.FocusEventHandler<HTMLInputElement>
    >(
      (event) => {
        setOpen(true);
        onFocus?.(event);
      },
      [onFocus, setOpen]
    );

    const handleOnBlur = React.useCallback<
      React.FocusEventHandler<HTMLInputElement>
    >(
      (event) => {
        onBlur?.(event);
      },
      [onBlur]
    );

    React.useImperativeHandle(ref, () => {
      return inputRef.current as HTMLInputElement;
    });

    React.useEffect(() => {
      setSearchStr(value || "");
    }, [setSearchStr, value]);

    React.useEffect(() => {
      setVariant(variant);
    }, [variant]);

    return (
      <div
        className={cn(
          "flex flex-row items-center border-border",
          wrapperClassName
        )}
      >
        <CommandInput
          wrapperClassName={cn("border-none w-full")}
          className={className}
          value={searchStr}
          onValueChange={handleOnValueChange}
          onKeyUp={(event) => {
            if (event.key === "Escape" && inputRef?.current) {
              setOpen(false);
              inputRef.current?.blur();
            }
          }}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          ref={inputRef}
          {...props}
        />
        <Button
          disabled={!hasSearchString}
          size="icon-sm"
          variant="ghost"
          className={cn("mr-2 transition-opacity", {
            "opacity-0": !hasSearchString,
          })}
          onPress={() => handleOnValueChange("")}
        >
          <ButtonIcon>
            <X />
          </ButtonIcon>
        </Button>
      </div>
    );
  }
);

SearchInput.displayName = CommandInput.displayName;

type SearchListProps = CommandListProps;

const SearchList = React.forwardRef<
  React.ElementRef<typeof SearchGroup>,
  SearchListProps
>(({ className, ...props }: SearchListProps, ref) => {
  const { open } = useSearchContext();

  return (
    <CommandList
      data-open={open}
      className={cn(
        "absolute left-[-1px] right-[-1px] top-[100%] rounded-b-lg border bg-popover leading-none",
        { hidden: !open },
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

SearchList.displayName = SearchGroup.displayName;

type SearchItemProps = CommandItemProps;

const SearchItem = React.forwardRef<
  React.ElementRef<typeof CommandItem>,
  SearchItemProps
>(({ className, onSelect, ...props }: SearchItemProps, ref) => {
  const { setOpen } = useSearchContext();

  const handleOnSelect = React.useCallback((value: string) => {
    setOpen(false);
    if (!!onSelect) onSelect(value);
  }, []);
  return (
    <CommandItem
      className={cn("search__item", className)}
      ref={ref}
      onSelect={handleOnSelect}
      {...props}
    />
  );
});

SearchItem.displayName = CommandItem.displayName;

// type SearchLinkProps = Omit<CommandItemProps, 'onClick'> &
//   Pick<LinkProps, 'href' | 'onClick'> &
//   Pick<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'target'>;

// const SearchLink = React.forwardRef<
//   React.ElementRef<typeof SearchItem>,
//   SearchLinkProps
// >(({ className, href, onClick, target, ...props }: SearchLinkProps, ref) => {
//   const { setOpen } = useSearchContext();

//   const handleOnClick = React.useCallback(
//     (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
//       setOpen(false);
//       if (onClick) onClick(event);
//     },
//     [onClick, setOpen],
//   );
//   return (
//     <Link
//       className={cn('search__link')}
//       href={href}
//       target={target}
//       onClick={handleOnClick}>
//       <SearchItem
//         className={cn('cursor-pointer', className)}
//         ref={ref}
//         {...props}
//       />
//     </Link>
//   );
// });

// SearchLink.displayName = 'SearchLink';

type SearchListContentProps = React.HTMLAttributes<HTMLDivElement>;

const SearchListContent = React.forwardRef<
  React.ElementRef<typeof SearchGroup>,
  SearchListContentProps
>(({ className, ...props }: SearchListContentProps, ref) => {
  const { loading } = useSearchContext();

  return (
    <div
      className={cn("search__list-content", { hidden: loading }, className)}
      ref={ref}
      {...props}
    />
  );
});

SearchListContent.displayName = "SearchListContent";

type SearchLoadingProps = CommandLoadingProps;

const SearchLoading = React.forwardRef<
  React.ElementRef<typeof CommandLoading>,
  SearchLoadingProps
>(({ ...props }: SearchLoadingProps, ref) => {
  const { loading } = useSearchContext();

  return (
    <div
      className={cn("search__loading", { hidden: !loading })}
      ref={ref}
      {...props}
    />
  );
});

SearchLoading.displayName = CommandLoading.displayName;

type SearchSkeletonGroupProps = SearchGroupProps;

const SearchSkeletonGroup = React.forwardRef<
  React.ElementRef<typeof SearchGroup>,
  SearchSkeletonGroupProps
>(({ className, ...props }: SearchSkeletonGroupProps, ref) => {
  return (
    <SearchGroup
      heading={<Skeleton className="search__skeleton-group h-2 w-[70px]" />}
      className={className}
      ref={ref}
      {...props}
    />
  );
});

SearchSkeletonGroup.displayName = SearchGroup.displayName;

type SearchSkeletonItemProps = SearchItemProps;

const SearchSkeletonItem = React.forwardRef<
  React.ElementRef<typeof SearchItem>,
  SearchSkeletonItemProps
>(({ className, ...props }: SearchSkeletonItemProps, ref) => {
  return (
    <SearchItem
      className={cn("search__skeleton-item", className)}
      disabled
      ref={ref}
      {...props}
    >
      <Skeleton className="search__skeleton-item-part size-12 rounded-xl" />
      <Skeleton className="search__skeleton-item-part ml-2 h-4 w-[200px]" />
    </SearchItem>
  );
});

SearchSkeletonItem.displayName = SearchItem.displayName;

type SearchEmptyProps = CommandEmptyProps;

const SearchEmpty = React.forwardRef<
  React.ElementRef<typeof CommandEmpty>,
  SearchEmptyProps
>(({ className, ...props }: SearchEmptyProps, ref) => {
  return (
    <div
      className={cn("search__empty py-6 text-center text-sm", className)}
      ref={ref}
      {...props}
    />
  );
});

SearchEmpty.displayName = CommandEmpty.displayName;

export {
  Search,
  SearchInput,
  SearchList,
  SearchListContent,
  SearchSkeletonGroup,
  SearchSkeletonItem,
  SearchEmpty,
  SearchGroup,
  SearchItem,
  //SearchLink,
  SearchLoading,
  SearchSeparator,
  SearchShortcut,
};

export type {
  SearchInputProps,
  SearchListProps,
  SearchListContentProps,
  SearchSkeletonGroupProps,
  SearchSkeletonItemProps,
  SearchGroupProps,
  SearchItemProps,
  //SearchLinkProps,
};
