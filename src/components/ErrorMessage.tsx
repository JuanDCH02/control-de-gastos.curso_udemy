type ErrorMessageProps = {
    children: React.ReactNode
}


export const ErrorMessage = ({children}: ErrorMessageProps) => {
  return (
    <p className="bg-red-600 text-white p-2 text-center font-bold text-sm uppercase">
        {children}
    </p>
  )
}
