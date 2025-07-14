import { Image, Send, X } from 'lucide-react'
import { useRef, useState } from 'react'
import useChat from '../store/useChat'
import { useAuth } from '../store/useAuth'

const ChatInput = () => {
  const { sendMessage, isSendingMessage } = useChat()
  const { selectedChat } = useAuth()
  const [image, setImage] = useState<File | null>(null)
  const submitRef = useRef<HTMLButtonElement | null>(null)
  const imageRef = useRef<HTMLInputElement | null>(null)
  const submitForm = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget as HTMLFormElement)
    if (
      formData.get('content')?.toString().trim() !== '' ||
      imageRef?.current?.files?.length
    ) {
      sendMessage(selectedChat?._id as string, formData)
      ;(e.currentTarget as HTMLFormElement).reset()
      setImage(null)
    } else {
      return
    }
  }
  return (
    <form
      className="flex items-center pr-5 gap-2 justify-between"
      onSubmit={submitForm}
    >
      <label className="input flex-1">
        <input type="text" name="content" placeholder="Type a message..." />
      </label>
      <button type="submit" hidden ref={submitRef} />
      <input
        type="file"
        accept="image/*"
        name="image"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
        hidden
        ref={imageRef}
      />
      {image && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={() => setImage(null)}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}
      <div className="flex items-center gap-2">
        {isSendingMessage ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : (
          <>
            <Image onClick={() => imageRef?.current?.click()} />
            <Send onClick={() => submitRef?.current?.click()} />
          </>
        )}
      </div>
    </form>
  )
}

export default ChatInput
