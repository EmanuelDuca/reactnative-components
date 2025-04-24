import * as React from "react";
import { cva, VariantProps } from "class-variance-authority";

export interface ISearchValue {
  open?: boolean;
  loading?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

export interface ISearchContext {
  clearSearch: () => void;
  loading: boolean;
  open: boolean;
  searchStr: string;
  selected: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchStr: React.Dispatch<React.SetStateAction<string>>;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  variant: SearchInputVariantProps["variant"];
  setVariant: React.Dispatch<
    React.SetStateAction<SearchInputVariantProps["variant"]>
  >;
}

export const SearchContext = React.createContext<ISearchContext | undefined>(
  undefined
);

export interface ISearchProviderProps {
  children: React.ReactNode;
  value?: ISearchValue;
}

const defaultSearchValue: ISearchValue = {
  open: false,
  loading: false,
};

export const searchInputVariants = cva("", {
  variants: {
    variant: {
      default: "border-border dark:border-border",
      destructive: "border-destructive",
    },
    open: {
      true: "dark:border-border-soft/dark-10",
      false: "",
    },
  },
  compoundVariants: [
    {
      variant: "destructive",
      open: true,
      className: "border-border dark:border-border",
    },
  ],
  defaultVariants: {
    variant: "default",
  },
});

type SearchInputVariantProps = VariantProps<typeof searchInputVariants>;

export const SearchProvider: React.FC<ISearchProviderProps> = ({
  children,
  value = defaultSearchValue,
}) => {
  const [variant, setVariant] =
    React.useState<SearchInputVariantProps["variant"]>();
  const [searchStr, setSearchStr] = React.useState("");
  const [selected, setSelected] = React.useState("");
  const [scopedOpen, setScopedOpen] = React.useState(!!value?.open);
  const [scopedLoading, setScopedLoading] = React.useState(!!value?.loading);

  const setOpen = React.useCallback<
    React.Dispatch<React.SetStateAction<boolean>>
  >(
    (props) => {
      if (value?.onOpen && !scopedOpen && props) value?.onOpen();
      if (value?.onClose && scopedOpen && !props) value?.onClose();
      if (!value?.open) setScopedOpen(props);
    },
    [scopedOpen, value]
  );

  const setLoading = React.useCallback<
    React.Dispatch<React.SetStateAction<boolean>>
  >(
    (props) => {
      if (!value?.loading) setScopedLoading(props);
    },
    [value]
  );

  const clearSearch = React.useCallback(() => {
    setSearchStr("");
    setSelected("");
  }, []);

  // React.useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setLoading(prevLoading => !prevLoading)
  //   }, 10000)

  //   return () => clearInterval(intervalId)
  // }, [])

  React.useEffect(() => {
    if (value?.open) setScopedOpen(value.open);
  }, [value]);

  return (
    <SearchContext.Provider
      value={{
        clearSearch,
        loading: scopedLoading,
        open: scopedOpen,
        searchStr,
        selected,
        setLoading,
        setOpen,
        setSearchStr,
        setSelected,
        setVariant,
        variant,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = (): ISearchContext => {
  const context = React.useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearchContext must be within Provider");
  }
  return context;
};
