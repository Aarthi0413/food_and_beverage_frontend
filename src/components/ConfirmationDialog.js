import React from 'react';

const ConfirmationDialog = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="fixed inset-0 flex justify-center items-center p-3 bg-gray-500 bg-opacity-50">
            <div className="bg-white p-4 rounded w-full max-w-md">
                <h3 className="text-lg font-semibold">{message}</h3>
                <div className="mt-4 flex justify-end gap-2">
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                        Yes
                    </button>
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationDialog;
