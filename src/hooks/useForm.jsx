import {useState} from 'react'

const useForm = (initialForm = {}) => {

    const [formState, setFormState] = useState(initialForm);

    const onChange = (e) => {
        setFormState((prevValues) => ({
            ...formState,
            [e.target.name]: e.target.value 
        }))
    } 

    const onResetForm = () => {
        setFormState(initialForm);
    }

  return {
    ...formState,
    formState,
    onChange,
    onResetForm
  }
}

export { useForm }