import { Form, Input, Button } from "antd";
import { useState } from "react";
import { useAddUserMutation } from "../redux/features/user/userApi";
import { Link, useNavigate } from "react-router";
import {
  setLoading,
  setError,
  setUser,
} from "../redux/features/user/userSlice";
import type { UserSignUp } from "../types";
import { useAppDispatch, useAppSelector } from "../redux/hook";

export default function Signup() {
  const [form] = Form.useForm();
  const [localError, setLocalError] = useState<string>("");
  const [addUser] = useAddUserMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoading = useAppSelector((state) => state.user.isLoading);

  const onFinish = async (values: UserSignUp) => {
    setLocalError("");
    dispatch(setLoading(true));

    if (values.password !== values.confirmPassword) {
      dispatch(setError("Passwords do not match!"));
      dispatch(setLoading(false));
      return;
    }

    try {
      const result = await addUser({
        email: values.email,
        password: values.password,
        username: values.username,
      }).unwrap();
      dispatch(setUser(result.data));
      dispatch(setLoading(false));
      navigate("/login");
    } catch (err: unknown) {
      const errorMessage =
        (err as { data?: { error?: string } })?.data?.error ||
        "Failed to sign up";
      dispatch(setError(errorMessage));
      dispatch(setLoading(false));
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1729569297607-c65f976471c5?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative w-full max-w-md bg-white shadow-lg rounded-2xl p-8 z-10">
        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please enter your username!" }]}
          >
            <Input placeholder="Enter username" size="large" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input placeholder="Enter email" size="large" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password placeholder="Enter password" size="large" />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            rules={[
              { required: true, message: "Please confirm your password!" },
            ]}
          >
            <Input.Password placeholder="Confirm password" size="large" />
          </Form.Item>
          {localError && (
            <p className="text-red-500 text-sm mb-2 text-center">
              {localError}
            </p>
          )}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
              size="large"
              loading={isLoading}
            >
              Sign Up
            </Button>
          </Form.Item>
        </Form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
