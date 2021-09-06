import React, { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Button, Form, Input, notification, Select, Tag } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { useRouter } from 'next/router';
import { getCate, postFetcher } from '../fetch';
import { Categories } from './[categories]';
import { Post } from '.';
import axios from 'axios';
import MarkEditor from '../components/MarkEditor';

const { Item } = Form;

const Container = styled.div`
  margin: 120px auto 0 auto;
  max-width: 1200px;
  width: 100%;

  .upload__header {
    display: flex;
  }

  .select__container {
    width: 120px;
  }

  .title__container {
    width: 500px;
    input {
      border: none;
      border-bottom: 1px solid #dbdbdb;
    }
  }

  textarea {
    margin-top: 1em;
    border: none;
  }

  .tag__container {
    margin-top: 1em;
    width: 300px;
  }
`;

const TagForm = styled.div`
  display: flex;
  align-items: center;

  button {
    margin-bottom: 10px;
    margin-left: 12px;
  }
`;

interface FormValues {
  title: string;
  category: string;
  tags: string;
  preview: string;
}

const Upload = () => {
  const router = useRouter();
  const [uploadForm] = Form.useForm();
  const [form, setForm] = useState<FormValues>();
  const [desc, setDesc] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Categories[]>([]);
  const [prevDesc, setPrevDesc] = useState<string>();
  // 여긴 에디터일때
  const [editPost, setEditPost] = useState<Post>();

  const handleFormChange = useCallback((_: any, all: any) => {
    setForm(() => all);
  }, []);

  // const handleQuillChange = useCallback((values: any) => {
  //   setDesc(() => values);
  // }, []);

  const handleTags = useCallback(() => {
    if (form?.tags) {
      const { tags: tag } = form;
      setTags(() => [...tags, tag]);
      uploadForm.setFieldsValue({ tags: '' });
    }
  }, [form, tags]);

  const handleDeleteTags = useCallback(
    (e) => {
      setTags(tags.filter((tag) => tag !== e.target.innerText));
    },
    [tags],
  );
  // 제출 시 텍스트를 html로 파싱하여 제출합니다.
  //   const onSubmit = useCallback(() => {
  //     const submit = {
  //       title,
  //       description: desc,
  //       content: text,
  //       creator: user._id ? user._id : '',
  //       stack,
  //       secret,
  //     };
  //   }, [text, title]);

  const handleFinish = useCallback(
    (e) => {
      setLoading(() => true);
      router.prefetch(`/contents/${form?.title}`);

      const { id } = e.currentTarget.dataset;

      if (!form?.title && !form?.category && desc === '') {
        setLoading(() => false);
        return notification.error({
          message: '다 입력해 주세요',
          placement: 'bottomLeft',
        });
      }

      const data = {
        ...form,
        tags: tags,
        description: desc,
        createDate: new Date().toDateString(),
      };

      if (id) {
        postFetcher({ ...data, updated: new Date().toDateString() } as Post, id)
          .then(() => {
            notification.success({
              message: '수정 완료',
              placement: 'bottomLeft',
            });
            router.push(`/contents/${form?.title}`);
          })
          .catch((e) => {
            console.error(e);
            setLoading(() => false);
            return notification.error({
              message: '다 입력해 주세요',
              placement: 'bottomLeft',
            });
          });
        return;
      }

      postFetcher(data as Post)
        .then(() => {
          notification.success({
            message: '게시 완료',
            placement: 'bottomLeft',
          });
          router.push(`/contents/${form?.title}`);
        })
        .catch((e) => {
          console.error(e);
          setLoading(() => false);
          return notification.error({
            message: '다 입력해 주세요',
            placement: 'bottomLeft',
          });
        });
    },
    [desc, form, tags, router],
  );

  useEffect(() => {
    getCate().then((res) => setCategories(res.data || []));
  }, []);

  //  여기부턴 수정 시~
  useEffect(() => {
    if (editPost) {
      const { title, description, tags, category, preview } = editPost;
      uploadForm.setFieldsValue({ title, category, preview });
      setForm(() => ({ title, category, preview, tags: '' }));
      setPrevDesc(() => description);
      setTags(() => tags);
    }
  }, [uploadForm, editPost]);

  useEffect(() => {
    if (router.query.edit) {
      const { title } = router.query;
      const post = async () =>
        await axios.get(`/post/${encodeURIComponent(title as string)}`).then((res) => setEditPost(() => res.data));
      post();
    }
  }, [router.query]);

  return (
    <Container>
      <Form size="large" form={uploadForm} name="uploadForm" layout="horizontal" onValuesChange={handleFormChange}>
        <div className="upload__header">
          <Item name="category" className="select__container" required>
            <Select bordered={false} style={{ borderBottom: '1px solid #dbdbdb' }}>
              {categories.map((list) => (
                <Select.Option key={list.category} value={list.category} children={list.category}></Select.Option>
              ))}
            </Select>
          </Item>
          <Item className="title__container" name="title" required>
            <Input placeholder="제목입력" />
          </Item>
        </div>

        <Item name="preview">
          <TextArea placeholder="미리보기 텍스트를 적어주세요." />
        </Item>

        <MarkEditor prevDesc={prevDesc} title={form?.title || ''} setDesc={setDesc} />
        {/* <QuillEditor value={prevDesc} handleQuillChange={handleQuillChange} /> */}

        {tags.map((tag) => (
          <Tag key={tag} onClick={handleDeleteTags}>
            {tag}
          </Tag>
        ))}
        <TagForm>
          <Item name="tags" label="태그 작성" className="tag__container">
            <Input placeholder="태그를 입력하세요." />
          </Item>
          <Button type="primary" htmlType="submit" onClick={handleTags}>
            입력
          </Button>
        </TagForm>
      </Form>

      <Button data-id={editPost?._id} onClick={handleFinish} loading={loading} type="primary" htmlType="submit">
        확인
      </Button>
    </Container>
  );
};

export default Upload;
