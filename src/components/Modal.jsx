import { Fragment, useRef, useState, useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { NoteContext } from "../context/NoteContext";

export default function Modal() {
  const context = useContext(NoteContext);
  const { modalOpen, setModalOpen, editNote, editId, setEditId } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const cancelButtonRef = useRef(null);
  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const submit = (e) => {
    e.preventDefault();
    editNote(editId, note.title, note.description, note.tag);
    setModalOpen(false);
  };
  return (
    <Transition.Root show={modalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setModalOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-2 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <Dialog.Title
                    as="h3"
                    className="text-lg text-center bg-teal-200 font-semibold leading-6 text-gray-900 "
                  >
                    Edit Note
                  </Dialog.Title>
                  <div className="container">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <div className="mt-2">
                        <form className="w-full  mx-auto">
                          <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3">
                              <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                              >
                                Title
                              </label>
                              <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="nick"
                                type="text"
                                name="title"
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3">
                              <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                              >
                                Tag
                              </label>
                              <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="tag"
                                type="text"
                                onChange={handleChange}
                                name="tag"
                              />
                            </div>
                          </div>
                          <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3">
                              <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                              >
                                Description
                              </label>
                              <textarea
                                className=" resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 "
                                id="description"
                                onChange={handleChange}
                                name="description"
                              ></textarea>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex justify-between sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="shadow bg-red-500 hover:bg-red-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                    onClick={() => setModalOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                  <button
                    className="shadow bg-teal-400 hover:bg-teal-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                    type="button"
                    onClick={submit}
                  >
                    Send
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
