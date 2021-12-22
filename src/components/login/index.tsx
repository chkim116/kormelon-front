import { Button, Form, Input } from 'antd';
import React, { useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useAppDispatch } from '../../store/hook';
import { postLoginRequest } from '../../store/reducer/auth';
import AppLoading from '../layouts/AppLoading';

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

const Login = () => {
  const dispatch = useAppDispatch();

  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // eslint-disable-next-line no-unused-vars

  const handleChange = useCallback((_, all: any) => {
    setForm(all);
  }, []);

  const handleFinish = useCallback(async () => {
    const { username, password } = form;

    if (username && password) {
      setLoading(true);
      await dispatch(postLoginRequest(form));
      setLoading(false);
      router.push('/');
    }
  }, [form, router, dispatch]);

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
