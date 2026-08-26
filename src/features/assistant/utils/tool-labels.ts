/** Friendly, user-safe activity text for each of the 16 backend tool names — never expose the raw tool/function name. */
export const TOOL_LABELS: Record<string, string> = {
  get_categories: 'Looking up your categories',
  get_category_spending: 'Analyzing spending by category',
  get_daily_spending: 'Analyzing daily spending',
  get_expense: 'Looking up that expense',
  get_expenses: 'Looking up your expenses',
  get_largest_expenses: 'Finding your largest expenses',
  get_monthly_spending: 'Analyzing monthly spending',
  get_recurring_expenses: 'Checking recurring expenses',
  get_recurring_expense_summary: 'Summarizing recurring expenses',
  get_report_summary: 'Generating a spending summary',
  get_spending_trends: 'Analyzing spending trends',
  get_top_categories: 'Finding your top categories',
  get_total_spending: 'Calculating total spending',
  get_upcoming_recurring_expenses: 'Checking upcoming recurring expenses',
  get_weekly_spending: 'Analyzing weekly spending',
  get_yearly_spending: 'Analyzing yearly spending',
}

const DONE_LABELS: Record<string, string> = {
  get_categories: 'Categories retrieved',
  get_category_spending: 'Category spending analysis complete',
  get_daily_spending: 'Daily spending analysis complete',
  get_expense: 'Expense found',
  get_expenses: 'Expenses retrieved',
  get_largest_expenses: 'Largest expenses found',
  get_monthly_spending: 'Monthly spending analysis complete',
  get_recurring_expenses: 'Recurring expenses checked',
  get_recurring_expense_summary: 'Recurring expense summary complete',
  get_report_summary: 'Spending summary generated',
  get_spending_trends: 'Spending trends analyzed',
  get_top_categories: 'Top categories found',
  get_total_spending: 'Total spending calculated',
  get_upcoming_recurring_expenses: 'Upcoming recurring expenses checked',
  get_weekly_spending: 'Weekly spending analysis complete',
  get_yearly_spending: 'Yearly spending analysis complete',
}

export function toolStartedLabel(tool: string): string {
  return TOOL_LABELS[tool] ?? 'Working on it'
}

export function toolDoneLabel(tool: string, status: 'ok' | 'error'): string {
  if (status === 'error') return 'Could not complete that lookup'
  return DONE_LABELS[tool] ?? 'Done'
}
