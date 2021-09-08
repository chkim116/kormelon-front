import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { Button, Form, Input, Modal, notification, Select, Tag } from 'antd';
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
  width: 98%;
  @media all and (max-width: ${({ theme }) => theme.desktop}) {
    width: 95%;
  }

  img {
    max-width: 350px;
    width: 100%;
    object-fit: contain;
  }

  .upload__header {
    display: flex;
  }

  .select__container {
    width: 300px;
    display: flex;
  }

  .title__container {
    width: 90%;
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
  const [thumbPreview, setThumbPreview] = useState<string>('');
  const [prevDesc, setPrevDesc] = useState<string>();
  // 여긴 에디터일때
  const [editPost, setEditPost] = useState<Post>();

  // 임시저장
  const savePosts = typeof window === 'object' && localStorage.getItem('saved');
  const [savedId, setSaveId] = useState(-1);
  const [isSaveVisible, setIsSaveVisible] = useState(false);

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
      if (!form?.title || !form?.category || !thumbPreview) {
        setLoading(() => false);
        return notification.error({
          message: '다 입력해 주세요',
          placement: 'bottomLeft',
        });
      }

      if (!desc && !prevDesc) {
        setLoading(() => false);
        return notification.error({
          message: '본문을 입력해 주세요',
          placement: 'bottomLeft',
        });
      }

      const data = {
        ...form,
        thumb: thumbPreview,
        tags: tags,
        description: desc || prevDesc,
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
    [desc, form, tags, router, thumbPreview],
  );

  const handleUploadThumb = useCallback((e) => {
    const file = e.target.files[0];

    const fd = new FormData();

    fd.append('image', file);
    // 이미지 api
    const postImg = async () => {
      return await axios
        .post('/post/img', fd, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => setThumbPreview(res.data));
    };

    postImg();
  }, []);

  const handleSavePost = useCallback(() => {
    const save = {
      ...form,
      id: 1,
      thumb: thumbPreview,
      tags: tags,
      description: desc || prevDesc,
    };
    if (savePosts) {
      const s: any[] = JSON.parse(savePosts);
      let id = savedId;
      let index = -1;
      if (id) {
        index = s.findIndex((lst) => lst.id === parseInt(JSON.parse(id.toString())));
      }
      if (index >= 0) {
        s[index] = { ...save, id: index + 1 };
        localStorage.setItem('saved', JSON.stringify([...s]));
      } else {
        localStorage.setItem('saved', JSON.stringify([...s, { ...save, id: s.length + 1 }]));
        setSaveId(s.length + 1);
      }
    } else {
      localStorage.setItem('saved', JSON.stringify([save]));
      setSaveId(1);
    }

    notification.success({ message: '임시 저장 완료', placement: 'bottomLeft' });
  }, [notification, savePosts, form, thumbPreview, tags, desc, prevDesc, savedId]);

  const handleSaveVisible = useCallback(() => {
    setIsSaveVisible(true);
  }, []);

  const handleSaveVisibleClose = useCallback(() => {
    setIsSaveVisible(false);
  }, []);

  const handleSelectSavePost = useCallback(
    (e) => {
      const { index } = e.currentTarget.dataset;

      if (!savePosts) return;
      const saved = JSON.parse(savePosts);
      const post = saved.filter((lst: any) => lst.id === +index);
      const { title, category, preview, description, tags, thumb } = post[0];

      uploadForm.setFieldsValue({ title, category, preview });
      setSaveId(index);
      setForm(() => ({ title, category, preview, tags }));
      setPrevDesc(() => description);
      setTags(() => tags);
      setThumbPreview(() => thumb || '');
      setIsSaveVisible(false);
    },
    [savePosts, uploadForm],
  );

  useEffect(() => {
    getCate().then((res) => setCategories(res.data || []));
  }, []);

  //  여기부턴 수정 시~
  useEffect(() => {
    if (editPost) {
      const { title, description, tags, category, preview, thumb } = editPost;
      uploadForm.setFieldsValue({ title, category, preview });
      setForm(() => ({ title, category, preview, tags: '' }));
      setPrevDesc(() => description);
      setTags(() => tags);
      setThumbPreview(() => thumb || '');
    }
  }, [uploadForm, editPost]);

  useEffect(() => {
    if (router.query.edit) {
      const { title } = router.query;
      const post = async () =>
        await axios
          .get(`/post/${encodeURIComponent(title as string)}`)
          .then((res) => setEditPost(() => res.data.postByTitle));
      post();
    }
  }, [router.query]);

  return (
    <Container>
      <Modal visible={isSaveVisible} onOk={handleSaveVisible} onCancel={handleSaveVisibleClose}>
        {savePosts ? (
          JSON.parse(savePosts).map((lst: any, index: number) => (
            <Fragment key={index}>
              <div data-index={lst.id} style={{ cursor: 'pointer' }} onClick={handleSelectSavePost}>
                <h3>{lst.title}</h3>
                <h5>{lst.category}</h5>
                <small>{lst.description?.slice(0, 70)}</small>
              </div>
              <hr style={{ border: '1px solid #dbdbdb' }} />
            </Fragment>
          ))
        ) : (
          <h2>저장된 글이 없어요 :)</h2>
        )}
      </Modal>

      <Form size="large" form={uploadForm} name="uploadForm" layout="horizontal" onValuesChange={handleFormChange}>
        <Button onClick={handleSaveVisible}>임시저장글 불러오기</Button>
        <Item label="썸네일">
          <div>
            <img src={thumbPreview} alt="이 글의 썸네일이 될 사진" />
            <input type="file" accept="image/*" onChange={handleUploadThumb} />
          </div>
        </Item>
        <Item name="category" className="select__container" label="카테고리" required>
          <Select bordered={false} style={{ borderBottom: '1px solid #dbdbdb' }}>
            {categories.map((list) => (
              <Select.Option key={list.category} value={list.category} children={list.category}></Select.Option>
            ))}
          </Select>
        </Item>
        <Item className="title__container" name="title" label="제목" required>
          <Input placeholder="제목입력" />
        </Item>

        <Item name="preview">
          <TextArea placeholder="미리보기 텍스트를 적어주세요." />
        </Item>
        <TagForm>
          <Item name="tags" label="태그 작성" className="tag__container">
            <Input placeholder="태그를 입력하세요." />
          </Item>
          <Button type="primary" htmlType="submit" onClick={handleTags}>
            입력
          </Button>
        </TagForm>
        {tags?.map((tag) => (
          <Tag key={tag} style={{ marginBottom: '1em' }} onClick={handleDeleteTags}>
            {tag}
          </Tag>
        ))}
        <MarkEditor prevDesc={prevDesc} title={form?.title || ''} setDesc={setDesc} />
        {/* <QuillEditor value={prevDesc} handleQuillChange={handleQuillChange} /> */}
      </Form>

      <Button data-id={editPost?._id} onClick={handleFinish} loading={loading} type="primary" htmlType="submit">
        확인
      </Button>
      <Button style={{ marginLeft: '6px', background: 'green' }} type="primary" onClick={handleSavePost}>
        임시저장
      </Button>
    </Container>
  );
};

export default Upload;
