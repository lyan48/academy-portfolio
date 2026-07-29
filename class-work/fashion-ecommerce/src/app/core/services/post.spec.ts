import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { Post, PostService } from './post';

describe('PostService', () => {
  let service: PostService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(PostService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get posts from the API', () => {
    const mockPosts: Post[] = [
      {
        id: 1,
        title: 'First post',
        content: 'First post content',
      },
      {
        id: 2,
        title: 'Second post',
        body: 'Second post body',
      },
    ];

    service.getPosts().subscribe((posts) => {
      expect(posts).toEqual(mockPosts);
      expect(posts.length).toBe(2);
    });

    const request = httpTestingController.expectOne('http://localhost:4000/api/posts');

    expect(request.request.method).toBe('GET');

    request.flush(mockPosts);
  });
});
