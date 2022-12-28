export interface ProfileProps {
  logoutClose: () => void;
  logoutIsopen: boolean;
  logoutOpen: () => void;
  data:
    | {
        me?:
          | {
              id: string;
              phone: string;
              firstName: string;
              lastName: string;
            }
          | null
          | undefined;
      }
    | undefined;
  catalogModal: {
    isOpen: boolean;
    open: () => void;
    close: () => void;
    toggle: () => void;
  };
}