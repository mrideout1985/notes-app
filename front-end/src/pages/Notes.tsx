import { Controller, useFormContext } from 'react-hook-form'
import { Form, FormGroup, Input, Label } from 'reactstrap'

import { createArticle } from '@/api/services/services'
import useUserStore from '@/stores/authstore'

const Notes = () => {
   const { control, handleSubmit } = useFormContext()
   const user = useUserStore()
   const token = localStorage.getItem('token')

   const onSubmit = handleSubmit((data) => {
      createArticle(data, token, user.currentUser?.id).then((res) => {
         console.log(res)
      })
   })

   return (
      <div
         style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
         }}
      >
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
      </div>
   )
}

export default Notes
