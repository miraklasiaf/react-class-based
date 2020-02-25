import React from 'react'

const control = (props) => {
    return (
      <div className="flex justify-center">
        <div className="w-24 p-3 text-bold text-white">{props.label}</div>
        <button
          className="w-16 mr-3 mb-3 bg-red-700 p-3 outline-none rounded-lg hover:bg-blue-600 text-white"
          onClick={props.removed}
          disabled={props.disabled}
        >
          Less
        </button>
        <button
          className="w-16 mb-3 bg-yellow-700 p-3 outline-none rounded-lg hover:bg-blue-600 text-white"
          onClick={props.added}
        >
          More
        </button>
      </div>
    );
}

export default control;
