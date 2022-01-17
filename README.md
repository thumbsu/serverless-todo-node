# Serverless Application Model(SAM)으로 TODO CRUD API 만들기 (Node.js)

## SAM Study

### SAM 리소스

- `AWS::Serverless::SimpleTable`
- 단일 속성의 Primary Key를 사용하여 DynamoDB 테이블을 생성할 때 사용하는 리소스 타입
- DynamoDB의 좀더 고급 기능을 사용하고자 한다면, SimpleTable이 아닌 Table을 사용해야 함
- Parameters에 명시되는 것들은 스택을 생성하거나 변경될 때 runtime에 전달되는 값들로, Resources나 Outputs에서 참조(Ref)해서 사용할 수 있음

```yaml
Parameters:
  TodoTableNameParameter:
    Type: String
    Default: todo-list
    Description: Name of Todo Dynamo Table

Resources:
  # DynamoDB
  TodoTable:
    Type: AWS::Serverless::SimpleTable
    Properties:
      PrimaryKey:
        Name: id
        # 유효한 값:String,Number,Binary
        Type: String
      ProvisionedThroughput:
        ReadCapacityUnits: 1
        WriteCapacityUnits: 1
      TableName:
        Ref: TodoTableNameParameter
```

### Arn: The Amazon Resource Name

- lambda 함수나 ec2 등을 생성할 때 생성되는 일련번호
- 절대값으로 되어있음
- 계정 고유번호 + 리소스 타입 + 리전 + 객체고유번호
- ex. `arn:aws:cognito-idp:us-east-1:123412341234:userpool/us-east-1_123412341.`

### Select, Split

- `TABLE_NAME: !Select [1, !Split ['/', !GetAtt TodoTable.Arn]]`
- `TodoTable`의 Arn(이런 형태의 String - `arn:aws:cognito-idp:us-east-1:123412341234:userpool/us-east-1_123412341.`)을 '/' 기준으로 배열에 넣어서 인덱스 1번을 선택함
