import { useEffect } from "react";
import { Cell, Pie, PieChart, Tooltip } from "recharts";
import { useItems } from "../../contexts/ItemsContext";
import { productCategories } from "../../InitialData/productCategories";
import styles from "./CategoryDistribution.module.css";

function CategoryDistribution({
  chartStyle,
  labelStyle,
  categoryDistribution,
  setCategoryDistribution,
}) {
  const { products } = useItems();

  //Category Distribution
  useEffect(() => {
    setCategoryDistribution(() => {
      const onlyCategories = productCategories.filter(
        (category) => category !== "All"
      );

      const catDis = onlyCategories.map((category) => {
        const distributedCategory = products
          .filter((product) => product.category === category)
          .reduce((acc, curr) => {
            acc += curr.stock - curr.currentStock;

            return acc;
          }, 0);

        return { category, sales: distributedCategory };
      });

      return catDis.filter((cat) => cat.sales !== 0);
    });
  }, [products, setCategoryDistribution]);

  const COLORS = [
    "#B821CF",
    "#8AB913",
    "#F38469",
    "#AC4F6F",
    "#5B431A",
    "#41F68C",
    "#D6CF85",
    "#B21B2A",
    "#ED113B",
    "#560957",
    "#1CB17C",
    "#B1042E",
    "#5FFE24",
    "#229751",
    "#63F284",
    "#CCBAF8",
  ];

  const sorted = categoryDistribution
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 3);

  return (
    <div className={chartStyle}>
      <h3 className={labelStyle}>Category Distribution</h3>
      <div>
        <PieChart width={400} height={250}>
          <Pie
            data={categoryDistribution}
            dataKey="sales"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={100}
            // label={({ category }) => category}
          >
            {categoryDistribution.map((_, i) => (
              <Cell key={i} fill={COLORS[i]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
        <div className={styles.top}>
          {sorted.map((item) => (
            <p>
              {item.category}: {item.sales}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryDistribution;
