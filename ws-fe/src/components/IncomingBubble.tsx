
interface IncomingMessageProps {
    IncomingMessage: string;
}
function IncomingBubble({IncomingMessage}: IncomingMessageProps) {
  return (
    <div className="h-auto w-4/12 px-8 py-4 m-5 bg-gray-200 flex rounded-2xl">
        <p className="font-medium text-base text-black ">
            {IncomingMessage}
        </p>
    </div>
  )
}

export default IncomingBubble