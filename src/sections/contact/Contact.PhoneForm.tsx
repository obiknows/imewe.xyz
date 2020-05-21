import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'
import { Formik, Form as FormikForm, Field } from 'formik'

import Form from '@components/Form'
import media from '@styles/media'
import { apiCall } from '@utils'
import { CheckIcon } from '../../icons/ui'

const validate = values => {
  let errors = {}

  if (values.phone && values.phone.match(/\d/g).length !== 10) {
    errors.phone = 'Full number required'
  }

  return errors
}

class PhoneForm extends Component {
  state = {
    submitted: false,
  }

  handleSubmit = async (values, { setErrors, setSubmitting }) => {
    const { phone } = values

    // Throws error if empty number on submit since we don't validate on blur
    if (!phone) {
      return setErrors({ phone: 'Full number required' })
    }

    const method = 'post'
    const endpoint = '/contact/phone'
    const data = { phone }

    try {
      await apiCall({ method, endpoint, data })

      setSubmitting(false)
      this.setState({ submitted: true })
    } catch (err) {
      console.warn(err)
    }
  }

  render() {
    return (
      <div>
        {this.state.submitted ? (
          <SubmittedTextContainer>
            <SubmittedText>Thank you! We'll call you shortly.</SubmittedText>{' '}
            <CheckIcon />
          </SubmittedTextContainer>
        ) : (
          <Formik
            onSubmit={this.handleSubmit}
            validate={validate}
            initialValues={{ phone: '' }}
            render={() => (
              <StyledFormikForm>
                <FormSection>
                  <Field
                    component={Form.Phone}
                    label="+1-323-553-3738"
                    name="phone"
                  />
                </FormSection>
              </StyledFormikForm>
            )}
          />
        )}
      </div>
    )
  }
}

export default PhoneForm

const FormSection = styled.fieldset`
  margin-bottom: 5rem;
`

const StyledFormikForm = styled(FormikForm)`
  align-self: flex-end;
  position: relative;
  width: 36rem;

  ${media.desktop`
    width: 100%;
  `};

  ${media.phone`
    max-width: 100%;
  `};
`

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const SubmittedTextContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.8rem;
  padding: 2rem 0 0 0;
  margin-bottom: 7.8rem;
  animation: 200ms ${fadeIn} ${props => props.theme.transitions.in};

  ${media.desktop`
    padding: 2rem 0 4rem;
    margin-bottom: 0;
  `};
`

const SubmittedText = styled.p`
  font-size: 1.8rem;
  color: #fff;
`
