import { useLoaderData } from "react-router-dom";
import Table from "../components/Table";
import { deleteItem, fetchData } from "../helpers";
import { toast } from "react-toastify";

export function expensesLoader() {
  //   const userName = fetchData("userName");
  //   const budgets = fetchData("budgets");
  const expenses = fetchData("expenses");
  return { expenses };
}

// action
export async function expensesAction({request}){
  const data = await request.formData()
  const {_action,...values}= Object.fromEntries(data)
  if (_action === "deleteExpense") {
    try {
      // create expense
      // throw new Error("You failed");
      deleteItem({
       key:"expenses",
       id:values.expenseId
      });
      return toast.success(`Expense deleted`);
    } catch (e) {
      throw new Error("There was a problem deleting your expense.");
    }
  }
}

export default function ExpensesPage() {
  const { expenses } = useLoaderData();
  return (
    <div className="grid-lg">
      <h1>All Expenses</h1>
      {expenses && expenses.length > 0 ? (
        <div className="grid-md">
          <h2>
            Recent Expenses <small>({expenses.length} total)</small>
          </h2>
          <Table
            expenses={expenses.sort((a, b) => b.createdAt - a.createdAt)}
          />
        </div>
      ) : (
        <p>No expenses to show.</p>
      )}
    </div>
  );
}
