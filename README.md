nest project initialization command:
$ npm i -g @nestjs/cli
$ nest new project-name

CẤU TRÚC NESTJS:
# Controller: Là nơi xử lý các yêu cầu từ client (xử lý các yêu cầu HTTP, xử lý logic cần thiết và gọi các service tương ứng).
# Services: chịu thực hiện các tác vụ của ứng dụng. Thường chứa các logic xử lý phức tạp như truy vấn CSDL, gọi API ngoài. giở các sự kiện hoặc thông báo đến các thành phần khác.
# Module: là nơi giúp tổ chức và quản lý các thành phần của ứng dụng. Mỗi module đại diện cho một phần của ứng dụng, bao gồm các controllers, services, providers liên quan. Modules giúp ta xác định phạm vi các thành phần và quyết định cách chúng tương tác với nhau.
        - providers: là nơi cung cấp các đối tượng hoặc giá trị sử dụng trong ứng dụng. Chúng có thể là services, repositories, thư viện bên ngoài hoặc bất kỳ thành phần nào cần được chia sẻ và sử dụng trong ứng dụng.
        - controllers: 
        - imports:
        - exports: 
# Middleware:
# Pipes: Là bộ lọc sử dụng để xác thực và chuyển đổi DỮ LIỆU đầu vào trước khi được xử lý bởi các controllers hoặc services. Chúng giúp kiểm tra tính hợp lệ của dữ liệu và thực hiện các biến đổi cần thiết.
# Guards: là thành phần để kiểm tra và quyết định việc thực thi yêu cầu vào các controllers. VD như quyền truy cập, xác thực người dùng, kiểm tra tiken, ... trước khi truy cập vào controllers.
# Interceptors: được sử dụng để thêm xử lú trước và sau khi các yêu cầu được xử lý như ghi lại nhật ký, xử lý lỗi hoặc thêm thông tin bổ sung vào các phản hồi. Chúng được thực thi sau middleware, sau Guard và trước và sau Route handler.

# Phân biệt middleware, pipes và interceptors.
Thứ tự xử lí: Middleware -> Interceptors -> Pipes -> Route Handler -> Interceptors.
    -> Khi muốn chuyển đổi dữ liệu đầu vào trước khi xữ lý thì hãy chọn Pipes.
    -> Khi chỉ muốn thực hiện 1 đoạn logic nào đó trước khi handler router thì nên dùng middleware.
    -> Còn trường hợp muốn xử lí logic gì đó trước và sau handler router thì nên dùng interceptor.

#Dependency Injection (DI): một nguyên tắc giúp module cấp cao tương tác với module cấp thấp qua interface (gắn các phụ thuộc cần thiết).

npm i class-validator 
npm i class-transformer

**
Model: dùng để định nghĩa cấu trúc dữ liệu trong ứng dụng, k tương tác trực tiếp với DB.
Dto: thường dùng để truyền dữ liệu qua lại giữa các tầng của ứng dụng (ví dụ như truyền dữ liệu từ controller đến service), thường được dùng để xác thực; k tương tác trực tiếp với DB.
Entity: dùng để định nghĩa cấu trúc bảng dữ liệu trong DB, dùng để tương tác với DB.

# buffer: cấu trúc lưu dữ liệu dưới dạng nhị phân (thường để lưu hình ảnh, video, ...)

# queues: là mẫu thiết kế mạnh mẽ giúp bạn giải quyết các tác vụ bất đồng bộ, các vấn đề về hiệu suất và mở rộng dự án. VD: làm mượt các quy trình xử lý, sử lý các task yêu cầu nhiều tài nguyên và thời gian (VD như chuyển đổi mã âm thanh, ...), freeing up user-facing processes to remain responsive. 

# redis: cơ sở dữ liệu đệm

isGlobal ???

# background job: công việc được xử lý dưới nền, k làm ảnh hưởng đến tương tác người dùng. Những công việc này thường độc lập.

# Cài đặt bull: 
npm install --save @nestjs/bull bull
- Import trong app.module:
    imports: [
        BullModule.forRoot([
            redis:{
                host: 'localhost',
                port: 6379
            }
        ])
    ]
    properties other than redis: 
    - limiter: RateLimiter - Options to control the rate at which the queue's jobs are processed. See RateLimiter for more information. Optional.
    - redis: RedisOpts - Options to configure the Redis connection. See RedisOpts for more information. Optional.
    - prefix: string - Prefix for all queue keys. Optional.
    - defaultJobOptions: JobOpts - Options to control the default settings for new jobs. See JobOpts for more information. Optional.
    - settings: AdvancedSettings - Advanced Queue configuration settings. These should usually not be changed. See AdvancedSettings for more information. Optional.

- Đăng ký hàng đợi:
    BullModule.registerQueue({
        name: 'job-name',
        redis: {
            port: ..., (đây là option để chỉ định redis db muốn kết nối trong trường hợp ứng dụng kết nối nhiều redis db)
        }
    })
- Add job:
    + The first, we must create constructor by InjectQueue to   udentifies the queue by its name.
        @Injectable()
        export class AudioService {
            constructor(@InjectQueue('audio') private audioQueue: Queue) {}
        }
    + After that, calling add() method to add job.
        const job = await this.audioQueue.add({
                foo: 'name', //tên đối tượng cần xử lý
            },
            { delay: 3000 }, //to delay the start of job
            { lifo: true }, 
            { priority: N } //to prioritize a job, N is ordinal number. Exp: if ordinal number of job1 is higher than job2, job 1 will processed first. 
        );
- Declare a consumer: A consumer is a class defining methods that either process jobs added into the queue, or listen for events on the queue or both. Using @Processor() decorator as follows:
    @Processor('job-name')
    
    