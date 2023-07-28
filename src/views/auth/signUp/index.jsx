/* eslint-disable */
/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2023 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React, { useState } from "react";
import { NavLink } from "react-router-dom";
// Chakra imports
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import { HSeparator } from "components/separator/Separator";
import DefaultAuth from "layouts/auth/Default";
// Assets
import illustration from "assets/img/auth/auth.png";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { useHistory } from "react-router-dom";
import { USER_ROLE } from "utils/constant";
import axios from "axios";
import { API_BACKEND_URL } from "utils/constant";
import { CountrySelect } from "components/selectOptions/country.component";
import { NotificationContainer, NotificationManager } from "react-notifications";

function SignUp() {
  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const googleBg = useColorModeValue("secondaryGray.300", "whiteAlpha.200");
  const googleText = useColorModeValue("navy.700", "white");
  const googleHover = useColorModeValue(
    { bg: "gray.200" },
    { bg: "whiteAlpha.300" }
  );
  const googleActive = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.200" }
  );

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [showConfirm, setShowConfirm] = useState(false);
  const handleConfirmClick = () => setShowConfirm(!showConfirm);

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [country, setCountry] = useState('')
  const onSelect = (country) => setCountry(country);

  const history = useHistory()

  const onSignUp = async () => {

    if(!firstName || firstName.length == 0) {
      NotificationManager.warning('Enter firstname')
      return;
    }
    if(!lastName || lastName.length == 0) {
      NotificationManager.warning('Enter lastname.')
      return;
    }

    if(!email || !email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
      NotificationManager.warning('Enter valid email.')
      return;
    }

    if(password != confirmPassword) {
      NotificationManager.warning('Password is not matched.')
      return;
    }
    if(password.length < 8) {
      NotificationManager.warning('Password length should be more than 8.')
      return;
    }

    axios.post(
      API_BACKEND_URL + 'auth/register',
      {
        firstName: firstName,
        lastName: lastName,
        email: email,
        country: country,
        password: password
      },
      {
        headers: {
          Accept: '*/*'
        }
      }
    ).then((response) => {

      if (response.data.success) {
        NotificationManager.success('Sign up success.')
        history.push('/auth/sign-in')
      } else {
        NotificationManager.error(response.data.msg)
        history.push('/auth/sign-up')
      }

    }).catch(error => {
      NotificationManager.error('Sign up failed')
      console.log('login error', error)
      history.push('/auth/sign-up')
    });

  }

  return (
    <DefaultAuth illustrationBackground={illustration} image={illustration}>
      <NotificationContainer/>
      <Flex
        maxW={{ base: "100%", md: "max-content" }}
        w='100%'
        mx={{ base: "auto", lg: "0px" }}
        me='auto'
        h='100%'
        alignItems='start'
        justifyContent='center'
        mb={{ base: "30px", md: "60px" }}
        px={{ base: "25px", md: "0px" }}
        mt={{ base: "30px", md: "10vh" }}
        flexDirection='column'>
        <Box me='auto' mb={10}>
          <Heading color={textColor} fontSize='36px' mb='10px'>
            Sign Up
          </Heading>
          {/* <Text
            mb='36px'
            ms='4px'
            color={textColorSecondary}
            fontWeight='400'
            fontSize='md'>
            Fill inputs to sign up!
          </Text> */}
        </Box>
        <Flex
          zIndex='2'
          direction='column'
          w={{ base: "100%", md: "420px" }}
          maxW='100%'
          background='transparent'
          borderRadius='15px'
          mx={{ base: "auto", lg: "unset" }}
          me='auto'
          mb={{ base: "20px", md: "20px" }}>
          {/* <Button
            fontSize='sm'
            me='0px'
            mb='26px'
            py='15px'
            h='50px'
            borderRadius='16px'
            bg={googleBg}
            color={googleText}
            fontWeight='500'
            _hover={googleHover}
            _active={googleActive}
            _focus={googleActive}>
            <Icon as={FcGoogle} w='20px' h='20px' me='10px' />
            Sign up with Google
          </Button> */}
          {/* <Flex align='center' mb='25px'>
            <HSeparator />
            <Text color='gray.400' mx='14px'>
              or
            </Text>
            <HSeparator />
          </Flex> */}
          <FormControl>
            <Flex align='center'>
              <Flex direction='column' flex={1} mr={2}>
                <FormLabel
                  display='flex'
                  ms='4px'
                  fontSize='sm'
                  fontWeight='500'
                  color={textColor}
                  mb='8px'>
                  First Name<Text color={brandStars}>*</Text>
                </FormLabel>
                <Input
                  isRequired={true}
                  value={firstName}
                  onChange={(e) => { setFirstName(e.target.value) }}
                  variant='auth'
                  fontSize='sm'
                  ms={{ base: "0px", md: "0px" }}
                  placeholder='Enter First Name'
                  mb='24px'
                  fontWeight='500'
                  size='lg'
                />
              </Flex>
              <Flex direction='column' flex={1} ml={2}>
                <FormLabel
                  display='flex'
                  ms='4px'
                  fontSize='sm'
                  fontWeight='500'
                  color={textColor}
                  mb='8px'>
                  Last Name<Text color={brandStars}>*</Text>
                </FormLabel>
                <Input
                  isRequired={true}
                  value={lastName}
                  onChange={(e) => { setLastName(e.target.value) }}
                  variant='auth'
                  fontSize='sm'
                  ms={{ base: "0px", md: "0px" }}
                  placeholder='Enter Last Name'
                  mb='24px'
                  fontWeight='500'
                  size='lg'
                />
              </Flex>
            </Flex>
            <FormLabel
              display='flex'
              ms='4px'
              fontSize='sm'
              fontWeight='500'
              color={textColor}
              mb='8px'>
              Email<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              isRequired={true}
              value={email}
              onChange={(e) => { setEmail(e.target.value) }}
              variant='auth'
              fontSize='sm'
              ms={{ base: "0px", md: "0px" }}
              type='email'
              placeholder='Enter Email Address'
              mb='24px'
              fontWeight='500'
              size='lg'
            />
            <FormLabel
              display='flex'
              ms='4px'
              fontSize='sm'
              fontWeight='500'
              color={textColor}
              mb='8px'>
              Country of Registration<Text color={brandStars}>*</Text>
            </FormLabel>
            <CountrySelect
              select={country}
              onSelect={onSelect}
            />
            <FormLabel
              ms='4px'
              mt={4}
              fontSize='sm'
              fontWeight='500'
              color={textColor}
              display='flex'>
              Password<Text color={brandStars}>*</Text>
            </FormLabel>
            <InputGroup size='md'>
              <Input
                isRequired={true}
                value={password}
                onChange={(e) => { setPassword(e.target.value) }}
                fontSize='sm'
                placeholder='Min. 8 characters'
                mb='24px'
                size='lg'
                type={show ? "text" : "password"}
                variant='auth'
              />
              <InputRightElement display='flex' alignItems='center' mt='4px'>
                <Icon
                  color={textColorSecondary}
                  _hover={{ cursor: "pointer" }}
                  as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                  onClick={handleClick}
                />
              </InputRightElement>
            </InputGroup>
            <FormLabel
              ms='4px'
              fontSize='sm'
              fontWeight='500'
              color={textColor}
              display='flex'>
              Confirm Password<Text color={brandStars}>*</Text>
            </FormLabel>
            <InputGroup size='md'>
              <Input
                isRequired={true}
                value={confirmPassword}
                onChange={(e) => { setConfirmPassword(e.target.value) }}
                fontSize='sm'
                placeholder='Min. 8 characters'
                mb='24px'
                size='lg'
                type={showConfirm ? "text" : "password"}
                variant='auth'
              />
              <InputRightElement display='flex' alignItems='center' mt='4px'>
                <Icon
                  color={textColorSecondary}
                  _hover={{ cursor: "pointer" }}
                  as={showConfirm ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                  onClick={handleConfirmClick}
                />
              </InputRightElement>
            </InputGroup>
            <Flex justifyContent='space-between' align='center' mb='24px'>
              <FormControl display='flex' alignItems='center'>
                <Checkbox
                  id='remember-login'
                  colorScheme='brandScheme'
                  me='10px'
                />
                <FormLabel
                  htmlFor='remember-login'
                  mb='0'
                  fontWeight='normal'
                  color={textColor}
                  fontSize='sm'>
                  Keep me logged in
                </FormLabel>
              </FormControl>
              <NavLink to='/auth/sign-up'>
                <Text
                  color={textColorBrand}
                  fontSize='sm'
                  w='124px'
                  fontWeight='500'>
                  Forgot password?
                </Text>
              </NavLink>
            </Flex>
            <Button
              fontSize='sm'
              variant='brand'
              fontWeight='500'
              w='100%'
              h='50'
              mb='24px'
              onClick={() => { onSignUp() }}
            >
              Sign Up
            </Button>
          </FormControl>
        </Flex>
      </Flex>
    </DefaultAuth>
  );
}

export default SignUp;
