import { ProductDailyDataInterface } from "./ProductDailyDataInterface";
import { ProductMonthlyDataInterface } from "./ProductMonthlyDataInterface";

export interface ProductStatInterface {
  productId: string;
  yearlySalesTotal: number;
  yearlyTotalSoldUnits: number;
  year: number;
  monthlyData: ProductMonthlyDataInterface[];
  dailyData: ProductDailyDataInterface;
}
