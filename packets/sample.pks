enum PacketTags {
    SimpleEntity
    SecondTag
    InitValueTest = 10
    IncrementTest
}

// テスト用
class SimpleEntityReq
{
    PacketTag SimpleEntity
    u64 player_id
    f32 x
    f32 y
    string name
    vec<i32> item_ids
    i32 hp
}
