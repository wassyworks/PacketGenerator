enum PacketTags {
    None
    SimpleEntity
    SimpleEntityList
    InitValueTest = 10
    IncrementTest
}

// テスト用
class SimpleEntity
{
    PacketTag SimpleEntity
    u64 player_id
    f32 x
    f32 y
    string name
    vec<i32> item_ids
    i32 hp
}

class SimpleEntityList
{
    PacketTag SimpleEntityList
    vec<SimpleEntity> simple_entity_list
}