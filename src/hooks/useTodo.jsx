import { useQuery } from "@tanstack/react-query";
import { getTodos } from "../services/apiTodos";
import { useEffect, useState } from "react";

function useTodo() {
  const [tableData, setTableData] = useState([]);
  const { data, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });
  useEffect(() => {
    if (data) {
      setTableData(data);
    }

    return () => {};
  }, [data]);
  return { data: tableData, isLoading };
}

export default useTodo;
