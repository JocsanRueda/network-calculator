import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";

interface StatisticCardProps {
  label: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
}

export function StatisticCard({ label, value, description, icon }: StatisticCardProps) {
  return (
    <Card className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-3 sm:p-4 shadow rounded-xl border bg-card text-card-foreground">
      <CardHeader className="p-1 flex flex-row items-center justify-between space-y-0 pb-1">
        <CardTitle className="tracking-tight text-xs sm:text-sm font-medium">
          {label}
        </CardTitle>
        {icon && <div className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent className="p-1 pt-0">
        <div className="text-xl sm:text-2xl font-bold text-left">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground text-left">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}