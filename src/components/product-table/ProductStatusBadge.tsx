import { Badge } from "@heroui/badge";

export const ProductStatusBadge = ({ status }: { status?: boolean }) => {
  const getStatusColor = (status: boolean) => {
    return status ? "success" : "danger";
  };

  const getStatusText = (status: boolean) => {
    return status ? "Ativo" : "Inativo";
  };

  return (
    <Badge color={getStatusColor(status || false)} variant="flat">
      {getStatusText(status || false)}
    </Badge>
  );
};
