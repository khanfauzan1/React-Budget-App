// library imports
import { CurrencyRupeeIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef } from "react";

import { Form, useFetcher } from "react-router-dom";

export default function () {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";

  const focusRef=useRef();
  const formRef = useRef();

  useEffect(()=>{
    if(!isSubmitting){
        formRef.current.reset()
        focusRef.current.focus()
    }
  },[isSubmitting])

  return (
    <div className="form-wrapper">
      <h2 className="h3">Create Budget</h2>
      <fetcher.Form
        method="post"
        className="grid-sm" 
        ref={formRef}>
        <div className="grid-xs">
          <label htmlFor="newBudget">Budget Name</label>
          <input
            type="text"
            name="newBudget"
            id="newBudget"
            placeholder="e.g., Groceries"
            ref={focusRef}
            required
          />
        </div>
        <div className="grid-xs">
          <label htmlFor="newBudgetAmount">Amount</label>
          <input
            type="number"
            step="1"
            name="newBudgetAmount"
            id="newBudgetAmount"
            placeholder="e.g., rs.500"
            required
            inputMode="decimal"
          />
        </div>
        <input type="hidden" name="_action" value="createBudget" />
        <button type="submit" className="btn btn--dark">
          {
          isSubmitting ? <span>Submitting...</span>:
          <><span>Create Budget</span>
          <CurrencyRupeeIcon width={20} /></>
          }
        </button>
      </fetcher.Form>
    </div>
  );
}
