import { Button, Form, Input, notification } from 'antd';
import React, { useCallback, useState } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import { useRouter } from 'next/router';
import AppLoading from '../components/layouts/AppLoading';
import { getAuth } from '../store/reducer/auth';
import { useAppDispatch } from '../store/hook';

const FormLayout = styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
`;

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 24,
  },
};

const loginFetcher = async (url: string, data: any) => {
  return await axios.post(url, data);
};

const Login = () => {
  const dispatch = useAppDispatch();

  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // eslint-disable-next-line no-unused-vars

  const handleChange = useCallback((_, all: any) => {
    setForm(all);
  }, []);

  const handleFinish = useCallback(() => {
    const { username, password } = form;

    if (username && password) {
      setLoading(() => true);
      loginFetcher('/auth/login', form)
        .then((res) => {
          dispatch(getAuth(res.data));
          router.push('/');
        })
        .catch(({ response }) => {
          setLoading(() => false);
          notification.error({
            message: `${response.data.message}`,
            placement: 'bottomLeft',
          });
        });
    }
  }, [form, dispatch, getAuth, router]);

  if (loading) {
    return <AppLoading />;
  }

  return (
    <FormLayout onValuesChange={handleChange} onFinish={handleFinish} {...layout} layout="horizontal" size="large">
      <Form.Item
        label="Id"
        style={{ width: '300px' }}
        name="username"
        rules={[
          {
            required: true,
            message: '아이디를 입력해 주세요!',
          },
        ]}
      >
        <Input placeholder="아이디" />
      </Form.Item>
      <Form.Item
        label="Password"
        style={{ width: '300px' }}
        name="password"
        rules={[
          {
            required: true,
            message: '비밀번호를 입력해 주세요!',
          },
        ]}
      >
        <Input.Password placeholder="비밀번호" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          확인
        </Button>
      </Form.Item>
    </FormLayout>
  );
};

export default Login;
