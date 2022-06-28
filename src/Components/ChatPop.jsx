import React from 'react'

const ChatPop = (props) => {
    const {data, user} = props;
  return (
    // <div style={data.from._id===user._id?{alignSelf:"flex-end"}:{alignSelf:"flex-start"}}>
        <div className="chat-pop-block" style={(data.from._id===user._id || data.from===user._id)?{alignSelf:"flex-end", backgroundColor:'cadetblue'}:{alignSelf:"flex-start"}}>
            {data.message}
        </div>
  )
}

export default ChatPop
