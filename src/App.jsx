import React, { useState } from 'react'
import { ReactComponent as ErrorIcon } from './images/icon-error.svg'

function clsx(...str) {
  return str.filter(Boolean).join(" ")
}

function Card({ children , className }) {
  return (
    <div 
    className={clsx("rounded-lg w-full p-6 text-center shadow",
    className
    )}
    >
     { children }
    </div>
  )
}

function TextField({ id , label , error }) {
  const [value , setValue] =  useState("")

  return(
    <div>
      <div className={clsx("relative flex items-center", error && "text-red")}>
        { value === '' && (
          <label 
            htmlFor="{id}" 
            className={clsx(
              "absolute px-3",
              "text-sm font-medium" ,
              value !== '' && 'opacity-0',
            )}
          >
            { label }
          </label>
          )
        }
        <input 
          type="text" 
          name={id}
          id={id}
          className={clsx(
            "outline-none",
            "border w-full p-3 rounded",
            error 
            ? "border-red" 
            : "border-blue-dark focus:border-blue border-opacity-80"
          )}
          onChange={(event) => setValue(event.target.value)}
        />
      
      { error && (
        <ErrorIcon className="absolute right-0 py-3 mr-3 h-full w-6" />
      )}
      </div>
      
      { error && (
        <div className="flex justify-end">
          <span className="text-xs text-red"> {error} </span>
        </div>
      )}
    </div>
  )
}

function Button({ className, children }) {
  return (
    <button 
      className={clsx(
        "rounded-lg w-full p-4 text-center bg-green shadow",
        className
      )}
    >
      { children } 
    </button>
  )
}

function App() {
  const [formstate, setFormState] =   useState([
    { id: "first-name", error: false, label: "First Name", errorMsg: 'First Name cannot be empty' },
    { id: "last-name", error: false, label: "Last Name" , errorMsg: 'Last Name cannot be emptyy'  },
    { id: "email", error: false, label: "Email", errorMsg: 'Looks like this is not an email' },
    { id: "password", error: false, label: "Password", errorMsg: 'Password cannot be empty' },
  ])

  /**
   * @param {Event} event 
   */
  function onSubmit(event) {
    event.preventDefault()

    const form = new FormData(event.target)

    const data = Object.fromEntries(form.entries())

    setFormState((formstate) => (
      formstate.map((state) => ({
        ...state,
        error: !Boolean(data[state.id])

      }))
    ))
  }

  console.log(formstate)

  return (
    <div 
      className="h-full text-white px-6 gap-16 space-y-16 md:flex sm:items-center container mx-auto"
    >
      {/* article */}
      <article className="pt-24 md:pt-0 text-center md:text-left space-y-6 flex-1">
        <h1 className="font-bold text-3xl">Learn to code by watching others</h1>
        <p>See how experienced developers solve problems in real-time. Watching scripted tutorials is great, but understanding how developers think is invaluable. </p>
      </article>

      <section className="grid gap-6 flex-1">
        {/* form title */}
        <Card className="bg-blue">
          <p className="px-8"> 

          <b>Try it free 7 days </b>then $20/mo. thereafter 
          
          </p>
        </Card>

        {/* form */}
        <Card className="bg-white text-blue-dark mb-32">
          <form className="space-y-4" onSubmit={onSubmit}>
            {formstate.map(({ id,  label, errorMsg, error }) => (
              <TextField 
                key={id}
                id={id}
                label={label}
                error={error && errorMsg}
              />
            ))}

            <Button className="text-white shadow-solid">CLAIM YOUR FREE TRIAL</Button>

            <div>
              <p className="text-gray text-xs px-4">
                By clicking the button, you are agreeing to our {" "}
                <a href="#" className="text-red font-bold">
                  Terms and Services
                </a>
              </p>
            </div> 
          </form>
        </Card>
      </section>
    </div>
  )
}

export default App
