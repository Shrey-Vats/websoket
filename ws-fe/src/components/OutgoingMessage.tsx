
interface OutgoingMessageProps {
    OutgoingMessage: string
}

function OutgoingBubble({OutgoingMessage}: OutgoingMessageProps) {
  return (
        <div className="h-auto w-4/12 px-8 py-4 m-5 bg-green-300/50 flex rounded-2xl justify-self-end-safe">
        <p className="font-medium text-base text-black ">
          {OutgoingMessage}
        </p>
    </div>
  )
}

export default OutgoingBubble