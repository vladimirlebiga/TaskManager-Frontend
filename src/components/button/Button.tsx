import React from 'react'

enum ButtonTypes {
SUBMIT = 'submit',
BUTTON = 'button',
RESET = 'reset',
}

type ButtonProps = {
    id: keyof typeof buttonConfig;
    onClick?: () => void;
    isDisabled?: boolean;
};

const buttonConfig = {
    createTask: {
        title: 'Create Task',
        className: 'bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700',
        type: ButtonTypes.SUBMIT,
    },

    edit: {
        title: 'Edit',
        className: 'bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-700',
        type: ButtonTypes.SUBMIT,
        },

    delete: {
        title: 'Delete',
        className: 'bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700',
        type: ButtonTypes.BUTTON,
        },
    
    done: {
        title: 'Done',
        className: 'bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700',
        type: ButtonTypes.BUTTON,
        },

    inProgress: {
        title: 'In Progress',
        className: 'bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-700',
        type: ButtonTypes.BUTTON,
        },

    todo: {
        title: 'ToDo',
        className: 'bg-blue-500 text-white py-2 px-4 rounded hover:bg-green-700',
        type: ButtonTypes.BUTTON,
    }
    
        
    }

        export const Button: React.FC<ButtonProps> = ({ id, onClick, isDisabled }) => {
            const { title, className, type } = buttonConfig[id];


  return (
    <button disabled={isDisabled} onClick={onClick} className={className} type={type}>{title}</button>
  )
}


 