import { createArticle } from '@/api/services/services'
import useUserStore from '@/stores/authstore'
import { useRef } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { FormGroup, Label, Input, Form } from 'reactstrap'

const CreateNote = () => {
   const { control, handleSubmit } = useFormContext()
   const user = useUserStore()
   const token = localStorage.getItem('token')
   const ref = useRef()

   const onSubmit = handleSubmit((data) => {
      createArticle(data, token, user.currentUser?.id).then((res) => {
         //handle errors
      })
   })

   return (
      <Form onSubmit={onSubmit}>
         <FormGroup>
            <Controller
               name="title"
               control={control}
               render={({ field }) => (
                  <>
                     <Label htmlFor="title">title</Label>
                     <Input id="title" type="text" {...field} />
                  </>
               )}
               defaultValue=""
            />
            <Controller
               name="description"
               control={control}
               render={({ field }) => (
                  <>
                     <Label htmlFor="description">description</Label>
                     <Input id="description" type="text" {...field} />
                  </>
               )}
               defaultValue=""
            />
            <Controller
               name="body"
               control={control}
               render={({ field }) => (
                  <>
                     <Label htmlFor="body">body</Label>
                     <Input id="body" type="text" {...field} />
                  </>
               )}
               defaultValue=""
            />
            <Input type="submit" />
         </FormGroup>
      </Form>
   )
}

export default CreateNote
