import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from "recharts";

type Venta = {
  cantidad_de_cerdos_vendidos: number;
  penalty_recibido: number;
};

type Farm = {
  name: string;
  ventas: Venta[];
  kg_de_comida_totales_consumidos: number;
};

type SimulateFarmsResponse = {
  farms: Farm[];
};

interface FarmsProfitChartProps {
  farms: Farm[];
}

const FarmsProfitChart: React.FC<FarmsProfitChartProps> = ({ farms }) => {
  const data = farms.map((farm) => {
    const grossProfit = farm.ventas.reduce((sum, venta) => {
      // beneficio bruto = suma de (cantidad * 1.56 * (1 - penalty))
      return (
        sum +
        venta.cantidad_de_cerdos_vendidos * 1.56 * (1 - venta.penalty_recibido)
      );
    }, 0);

    // costo = kg_de_comida_totales_consumidos * 0.03
    const farmCost = (farm.kg_de_comida_totales_consumidos || 0) * 0.03;

    // beneficio neto = beneficio bruto - costo
    const netProfit = grossProfit - farmCost;

    return {
      name: farm.name,
      grossProfit: Number(grossProfit.toFixed(2)),
      farmCost: Number(farmCost.toFixed(2)),
      netProfit: Number(netProfit.toFixed(2)),
    };
  });

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        {/* Línea en 0 para estilo Positive & Negative */}
        <ReferenceLine y={0} stroke="#000" />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="grossProfit"
          name="Beneficio bruto"
          fill="#8884d8"
        />
        <Bar
          dataKey="farmCost"
          name="Costo granja"
          fill="#82ca9d"
        />
        <Bar
          dataKey="netProfit"
          name="Beneficio neto"
          fill="#ffc658"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

const FarmsPage: React.FC = () => {
  const [farms, setFarms] = useState<Farm[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFarms = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("/simulate/farms");
        if (!res.ok) {
          throw new Error(`Error HTTP: ${res.status}`);
        }

        const data: SimulateFarmsResponse = await res.json();
        setFarms(data.farms || []);
      } catch (err: any) {
        setError(err.message || "Error al cargar los datos");
      } finally {
        setLoading(false);
      }
    };

    fetchFarms();
  }, []);

  if (loading) {
    return <p>Cargando datos de las granjas...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!farms.length) {
    return <p>No hay datos de granjas para mostrar.</p>;
  }

  return (
    <div style={{ width: "100%", height: 450 }}>
      <h2>Beneficios y Costes por Granja</h2>
      <FarmsProfitChart farms={farms} />
    </div>
  );
};

export default FarmsPage;
