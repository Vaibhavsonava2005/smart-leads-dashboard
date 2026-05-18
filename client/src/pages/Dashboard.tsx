export default function Dashboard() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Placeholder cards */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Leads</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">...</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Qualified</h3>
          <p className="mt-2 text-3xl font-bold text-green-600 dark:text-green-400">...</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Conversion Rate</h3>
          <p className="mt-2 text-3xl font-bold text-indigo-600 dark:text-indigo-400">...</p>
        </div>
      </div>
      <div className="mt-8 text-gray-500 dark:text-gray-400">
        Please navigate to the <a href="/dashboard/leads" className="text-indigo-600 hover:underline">Leads</a> section to view the data table.
      </div>
    </div>
  );
}
