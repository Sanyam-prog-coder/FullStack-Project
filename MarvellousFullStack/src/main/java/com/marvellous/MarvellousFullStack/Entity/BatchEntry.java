package com.marvellous.MarvellousFullStack.Entity;


import lombok.Getter;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;

@Document(collection = "BatchDetails")
@Getter
@Setter
public class BatchEntry
{
    @Id
    private String id;

    private String name;
    private  int fees; 
}
