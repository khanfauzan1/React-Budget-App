import { redirect } from "react-router-dom";
//helpers
import { deleteItem, getAllMatchingItems } from "../helpers";
//toast
import { toast } from "react-toastify";

export async function deleteBudget({ params }) {
  try {
    deleteItem({
      key: "budgets",
      id: params.id,
    });
    
    const associatedExpenses=getAllMatchingItems({
        category:"expenses",
        key:"budgetId",
        value:params.id,
    })

    associatedExpenses.forEach((expense) => {
        deleteItem({
            key:"expenses",
            id:expense.id
        })
    });

    toast.success("You've have deleted the budget!");
  } catch (e) {
    throw new Error("there was a problem creating your budget.");
  }

  //return redirect
  return redirect("/");
}
