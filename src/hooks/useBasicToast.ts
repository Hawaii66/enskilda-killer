import { useToast } from "@/components/ui/use-toast";

export const useBasicToast = () => {
  const { toast } = useToast();

  const internalToastBasic = (description: string, destructive?: boolean) => {
    internalToastTitle(
      "Något gick fel",
      description,
      destructive === undefined ? true : destructive
    );
  };

  const internalToastSave = (description: string) => {
    internalToastTitle("Sparad", description);
  };

  const internalToastTitle = (
    title: string,
    description: string,
    destructive?: boolean
  ) => {
    toast({
      title: title,
      description,
      variant: destructive ? "destructive" : "default",
    });
  };

  return {
    toast: internalToastBasic,
    toastTitle: internalToastTitle,
    toastSave: internalToastSave,
  };
};
