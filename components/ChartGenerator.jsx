import { useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function ChartGenerator() {
  const [xInput, setXInput] = useState("");
  const [yInput, setYInput] = useState("");
  const [chartType, setChartType] = useState("line");
  const [data, setData] = useState([]);

  const generateData = () => {
    const xValues = xInput.split(",").map((x) => x.trim());
    const yValues = yInput.split(",").map((y) => parseFloat(y.trim()));
    if (xValues.length !== yValues.length) return alert("X와 Y의 길이가 다릅니다");

    const structuredData = xValues.map((x, i) => ({ x, y: yValues[i] }));
    setData(structuredData);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">간단한 그래프 생성기</h1>

      <div className="space-y-2">
        <label className="block font-medium">X축 값 (쉼표로 구분)</label>
        <Input value={xInput} onChange={(e) => setXInput(e.target.value)} placeholder="예: 1월,2월,3월" />
      </div>

      <div className="space-y-2">
        <label className="block font-medium">Y축 값 (쉼표로 구분)</label>
        <Input value={yInput} onChange={(e) => setYInput(e.target.value)} placeholder="예: 100,200,300" />
      </div>

      <div className="space-y-2">
        <label className="block font-medium">그래프 종류</label>
        <Select onValueChange={(v) => setChartType(v)} defaultValue="line">
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="line">꺾은선 그래프</SelectItem>
            <SelectItem value="bar">막대 그래프</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button onClick={generateData}>그래프 생성</Button>

      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "line" ? (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="x" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="y" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          ) : (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="x" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="y" fill="#82ca9d" />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
