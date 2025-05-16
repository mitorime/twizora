import Image from "next/image"

interface TweetIconProps {
  isTerminal?: boolean;
  width: number;
  height: number;
}

export const TweetIcon = ({ isTerminal, width, height }: TweetIconProps) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center' }}>
      <Image
        src="/icon.png"
        alt="アイコン"
        width={`${width}`}
        height={`${height}`}
        style={{ borderRadius: '20px' }}
      />
      {!isTerminal && (
        <div style={{ flexGrow: 1, width: '40px', alignSelf: 'stretch', display: 'flex', justifyContent: 'center' }}>
          <div className='thread' style={{ borderRadius: '2px', height: '100%' }}></div>
        </div>
      )}
    </div>
  )
}
